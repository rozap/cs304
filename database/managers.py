


class Manager(object):

    def __init__(self, db):
        self.db = db




def entity_list():
    def select(fn):
        def wrapped(*args, **kwargs):
            cursor, results = fn(*args, **kwargs)

            #Get the column names out from the cursor
            columns = [c[0] for c in cursor.description]

            entities = []
            for tuple_row in results:
                #Creates a tuple of name,value pairs where name is the column name 
                #and the value is the row value 
                nvp = zip(columns, tuple_row)
                named = {name : value for (name, value) in nvp}
                entities.append(named)

            return entities


        return wrapped
    return select

def entity_write():
    def write(fn):
        def wrapped(*args, **kwargs):
            db, cursor = fn(*args, **kwargs)
            #ugh, mysql needs commit to be called on the db, not the cursor..so we need
            #to have both returned .__.
            db.commit()
            cursor.close()
        return wrapped
    return write