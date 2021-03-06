from datetime import datetime


class Manager(object):

    exclude_filters = set(['offset', 'limit'])

    def __init__(self, db):
        self.db = db

    def create_filters(self, *args, **kwargs):
        where_args = ''
        filters = list(set(kwargs.keys()) - self.exclude_filters)
        for i, k in enumerate(filters):
            try:
                float(kwargs[k][0])
                if i == 0:
                    template = 'WHERE `%s` = %s'
                else:
                    template = ' AND `%s` = %s'
            except ValueError:
                #Its a string
                if i == 0:
                    template = 'WHERE `%s` = \'%s\''
                else:
                    template = ' AND `%s` = \'%s\''

            where_args = where_args + (template % (k, kwargs[k][0]))
        return where_args


def sanitize_value(value):
    if(type(value) == str):
        return unicode(value, errors = 'ignore')
    elif type(value) == datetime:
        return datetime.strftime(value, '%d/%m/%y %H:%M')
    return value



def convert_entities(cursor, results):
    #Get the column names out from the cursor
    columns = [c[0] for c in cursor.description]

    entities = []
    for tuple_row in results:
        #Creates a tuple of name,value pairs where name is the column name 
        #and the value is the row value 
        nvp = zip(columns, tuple_row)
        named = {name : sanitize_value(value) for (name, value) in nvp}
        entities.append(named)
    return entities




def entity_list():
    def select(fn):
        def wrapped(*args, **kwargs):
            cursor, results = fn(*args, **kwargs)
            entities = convert_entities(cursor, results)
            return entities
        return wrapped
    return select



def entity_single():
    def select(fn):
        def wrapped(*args, **kwargs):
            cursor, results = fn(*args, **kwargs)
            entities = convert_entities(cursor, results)
            return entities[0]
        return wrapped
    return select




def entity_write():
    def write(fn):
        def wrapped(*args, **kwargs):
            db, cursor = fn(*args, **kwargs)
            #ugh, mysql needs commit to be called on the db, not the cursor..so we need
            #to have both returned .__.
            db.commit()
            insert_id = cursor.lastrowid
            cursor.close()
            return insert_id
        return wrapped
    return write


def entity_delete():
    def write(fn):
        def wrapped(*args, **kwargs):
            db, cursor = fn(*args, **kwargs)
            db.commit()
        return wrapped
    return write