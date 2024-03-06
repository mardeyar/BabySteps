import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('babysteps.db');

// Function to create tables if they do not already exist. This is a first run situation.
const profileSetup = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS baby_profile (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, gender TEXT NOT NULL, dob DATE NOT NULL, photo TEXT)',
            [],
            (_, result) => {
                console.log('Table named "baby_profile" created successfully!');
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
            'CREATE TABLE IF NOT EXISTS milestones (id INTEGER PRIMARY KEY AUTOINCREMENT, week_number INTEGER NOT NULL, milestone_name TEXT NOT NULL, milestone_info TEXT NOT NULL, date DATE NOT NULL, photo TEXT)',
            [],
            (_, result) => {
                console.log('Table named "milestones" created successfully!');
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

const createMilestone = (weekNumber, milestoneName, milestoneInfo, date, photo) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO baby_profile (week_number, milestone_name, milestone_info, date, photo) VALUES (?, ?, ?, ?, ?)',
            [weekNumber, milestoneName, milestoneInfo, date, photo || null],
            (_, result) => {
                console.log('Milestone created successfully!');
            },
            (_, error) => {
                console.log('Error creating milestone: ', error);
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
                callback(result.rows._array);
            },
            (_, error) => {
                console.log('Error fetching data from table "baby_profile": ', error);
            }
        );
    });
};

export { profileSetup, createProfile, checkData, milestoneSetup, createMilestone };