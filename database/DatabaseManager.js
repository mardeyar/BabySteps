import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('babysteps.db');

// Function to create tables if they do not already exist. This is generally a first run situation.
const initialSetup = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS baby_profile (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, middle_name TEXT, last_name TEXT NOT NULL, gender TEXT NOT NULL, dob TEXT NOT NULL, photo TEXT, disclaimer BOOLEAN NOT NULL DEFAULT 0)',
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

const createProfile = (firstName, middleName, lastName, gender, dob, photo) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO baby_profile (first_name, middle_name, last_name, gender, dob, photo) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, middleName, lastName, gender, dob, photo || null], // photo || null makes inserting a photo optional
            (_, result) => {
                console.log('Profile created successfully!');
            },
            (_, error) => {
                console.log('Error creating profile: ', error)
            },
        );
    });
};

const disclaimerCheck = (acknowledged) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE baby_profile SET disclaimer = ? WHERE id = 1',
            [acknowledged ? 1 : 0],
            (_, result) => {
                console.log('User acknowledged disclaimer');
            },
            (_, error) => {
                console.log('Acknowledgment error: ', error);
            },
        );
    });
};

// This function exists to check table for data; if there is data, skip first run pages on app launch
// const checkData = (callback) => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'SELECT * FROM baby_profile',
//             [],
//             (_, result) => {
//                 callback(result.rows._array);
//             },
//             (_, error) => {
//                 console.log('Error fetching data from table "baby_profile": ', error);
//             }
//         );
//     });
// };

export { initialSetup, createProfile, disclaimerCheck };