import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('babysteps.db');

// Function to create tables if they do not already exist. This is a first run situation.
// TODO: Fix up console log conditionals for table creation
const profileSetup = () => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT name FROM sqlite_master WHERE type="table" AND name="baby_profile"',
            [],
            (_, result) => {
                if (result.rows.length > 0) {
                    console.log('Table named "baby_profile" already exists: skipping table creation...');
                } else {
                    tx.executeSql(
                        'CREATE TABLE baby_profile (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, dob DATE NOT NULL, dad_name TEXT NOT NULL, mom_name TEXT NOT NULL, birth_height INT NOT NULL, birth_weight_lb INT NOT NULL, birth_weight_oz INT NOT NULL, photo TEXT)',
                        [],
                        () => {
                            console.log('Table named "baby_profile" created successfully');
                        },
                        (_, error) => {
                            console.log('Error creating table "baby_profile": ', error);
                        }
                    );
                }
            },
            (_, error) => {
                console.log('Error checking existence of table "baby_profile": ', error);
            }
        );
    });
};

const memorySetup = () => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT name FROM sqlite_master WHERE type="table" AND name="memories"',
            [],
            (_, result) => {
                if (result.rows.length > 0) {
                    console.log('Table named "memories" already exists: skipping table creation...');
                } else {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS memories (memory_id INTEGER PRIMARY KEY AUTOINCREMENT, memory_date DATE NOT NULL, memory_info TEXT NOT NULL, photo TEXT)',
                        [],
                        () => {
                            console.log('Table named "memories" created successfully');
                        },
                        (_, error) => {
                            console.log('Error creating table "memories": ', error);
                        }
                    );
                }
            },
            (_, error) => {
                console.log('Error checking existence of table "memories": ', error);
            }
        );
    });
};

const createProfile = (firstName, lastName, dob, photo, dadName, momName, birthHeight, birthLb, birthOz, doctorName, birthLocation) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO baby_profile (first_name, last_name, dob, dad_name, mom_name, birth_height, birth_weight_lb, birth_weight_oz, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, dob, photo || null, dadName, momName, birthHeight, birthLb, birthOz],
            (_, result) => {
                if (result.rowsAffected > 0) {
                    console.log('Profile created successfully!');
                }
            },
            (_, error) => {
                console.log('Error creating profile: ', error);
            },
        );
    });
};

const editProfile = (firstName, lastName, dob, photo, dadName, momName, birthHeight, birthLb, birthOz, doctorName, birthLocation) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE baby_profile SET first_name = ?, last_name = ?, dob = ?, dad_name = ?, mom_name = ?, birth_height = ?, birth_weight_lb = ?, birth_weight_oz = ?, photo = ?',
            [firstName, lastName, dob, photo || null, dadName, momName, birthHeight, birthLb, birthOz],
            (_, result) => {
                if (result.rowsAffected > 0) {
                    console.log('Profile updated successfully!');
                }
            },
            (_, error) => {
                console.log('Error updating profile: ', error);
            },
        );
    });
};

const createMemory = (memoryDate, memoryInfo, photo) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO memories (memory_date, memory_info, photo) VALUES (?, ?, ?)',
            [memoryDate, memoryInfo, photo || null],
            (_, result) => {
                console.log('Memory created successfully!', result.rowsAffected);
            },
            (_, error) => {
                console.log('Error creating memory: ', error);
            },
        );
    });
};

const fetchMemories = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM memories',
            [],
            (_, result) => {
                const rows = result.rows._array;
                console.log('Fetched', rows.length, 'memories');
                if (rows.length > 0) {
                    callback(rows);
                } else {
                    console.log('No memories found.');
                    callback([]);
                }
            },
            (_, error) => {
                console.log('Error fetching memories: ', error);
                callback([]);
            }
        );
    });
};

const deleteMemory = (milestoneId, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM memories WHERE memory_id = ?',
            [milestoneId],
            (_, result) => {
                console.log('Memory successfully deleted!', result.rowsAffected);
                if (callback) {
                    callback();
                }
            },
            (_, error) => {
                console.log('Error deleting memory: ', error);
            },
        );
    });
};

// This function exists to check table for data; if there is data, skip first run pages on app launch
const checkData = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM baby_profile',
            [],
            (_, result) => {
                const rows = result.rows._array;
                console.log("Data: ", rows);
                if (result.rows._array.length > 0) {
                    callback(result.rows._array);
                } else {
                    callback([]);
                }
            },
            (_, error) => {
                console.log('Error fetching data from table "baby_profile": ', error);
            }
        );
    });
};

export { profileSetup, createProfile, checkData, memorySetup, createMemory, fetchMemories, deleteMemory, editProfile };