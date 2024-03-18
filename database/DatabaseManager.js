import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('babysteps.db');

// Function to create tables if they do not already exist. This is a first run situation.
// TODO: Fix up console log conditionals for table creation
const profileSetup = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS baby_profile (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, gender TEXT NOT NULL, dob DATE NOT NULL, photo TEXT)',
            [],
            (_, result) => {
                if (result.rowsAffected === 0) {
                    console.log('Table named "baby_profile" already exists: skipping table creation...');
                } else {
                    console.log('Table named "baby_profile" created successfully!');
                }
            },
            (_, error) => {
                console.log('Error creating table "baby_profile": ', error);
            },
        );
    });
};

const milestoneSetup = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS milestones (milestone_id INTEGER PRIMARY KEY AUTOINCREMENT, milestone_date DATE NOT NULL, milestone_name TEXT NOT NULL, milestone_info TEXT NOT NULL, photo TEXT)',
            [],
            (_, result) => {
                if (result.rowsAffected === 0) {
                    console.log('Table named "milestones" already exists: skipping table creation...');
                } else {
                    console.log('Table named "milestones" created successfully!');
                }
            },
            (_, error) => {
                console.log('Error creating table "milestones": ', error);
            },
        );
    });
};

const createProfile = (firstName, lastName, gender, dob, photo) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO baby_profile (first_name, last_name, gender, dob, photo) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, gender, dob, photo || null], // photo || null makes inserting a photo optional
            (_, result) => {
                console.log('Profile created successfully!');
            },
            (_, error) => {
                console.log('Error creating profile: ', error);
            },
        );
    });
};

const createMilestone = (milestoneDate, milestoneName, milestoneInfo, photo) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO milestones (milestone_date, milestone_name, milestone_info, photo) VALUES (?, ?, ?, ?)',
            [milestoneDate, milestoneName, milestoneInfo, photo || null],
            (_, result) => {
                console.log('Milestone created successfully!', result.rowsAffected);
            },
            (_, error) => {
                console.log('Error creating milestone: ', error);
            },
        );
    });
};

const fetchMilestones = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM milestones',
            [],
            (_, result) => {
                const rows = result.rows._array;
                console.log('Fetched', rows.length, 'memories');
                if (rows.length > 0) {
                    callback(rows);
                } else {
                    console.log('No milestones found.');
                    callback([]);
                }
            },
            (_, error) => {
                console.log('Error fetching milestones: ', error);
                callback([]);
            }
        );
    });
};

const deleteMemory = (milestoneId, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM milestones WHERE milestone_id = ?',
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

export { profileSetup, createProfile, checkData, milestoneSetup, createMilestone, fetchMilestones, deleteMemory };