

const imports = require('./imports');


const pg = require('pg');

var connectionString = {
	user: 'postgres_user',
	host: 'localhost',
	database: 'spoonful_db',
	password: 'onlyAspoonful',
	port: 5432,
};

// creates a pool to use for transactions
const transactionPool = new pg.Pool(connectionString);


module.exports = {


    // This is an example transaction using pools in the globaltransactionpool.js
    ExampleTransaction: async function ExampleTransaction(full_query_previously_created, values_for_query_in_array_format, server_id, tablename, value, newprefixvalue) {

        // this return is here to make sure the example transaction is never called as it should never be.
        return; 

		// error handling for the pool
		var errorConnecting = false;
        await transactionPool.on('error', (err, client) => {
			console.error('Unexpected error on idle client', err)
			errorConnecting = true;
		});

        // this does a simple check on if there was an error, if not then dont do the command
        if (!errorConnecting) {
            // we connect our client to the pool, instead of client to the database
            const client = await transactionPool.connect();

            // you should do a try/catch here because we want to something called a "transaction" which allows us to commit and rollback any problems that might happen in our transactions
            // for example if you try to update the database and some crazy error happens then, we can always do a rollback
            try {

                // we begin the transaction, BEGIN lets the database know that we are starting a transaction that is not committed and everyhting done can be rolled back if there is an issue
                await client.query('BEGIN');

                // here is where you want to do your query/transaction stuff.
                // I'll include a few examples

                // Example 1
                const res = await client.query(full_query_previously_created, values_for_query_in_array_format);

                // Example 2
                var transactionForPrefix = 'UPDATE servers SET prefix = $1 WHERE server_id = $2';
                const res2 = await client.query(transactionForPrefix, [newprefixvalue, server_id]);

                // Example 3
                var queryExample = 'UPDATE $1 SET columnname = $2 WHERE server_id = $3';
                const res3 = await client.query(queryExample, [tablename, value, server_id]);


                // at the end of any transaction, if there is no error you want to commit it into the database
                await client.query('COMMIT');


                return res; // return your result and handle it;

            } catch (e) {
                // if error rollback
                await client.query('ROLLBACK');
                return false; // error state, handle this somewhere if the result is false
            } finally {
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                client.release();
            }
        }


    },












    PrefixTransaction: async function PrefixTransaction(new_prefix_value, guild_id) {

        // error handling for the pool
        var errorConnecting = false;
        await transactionPool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            errorConnecting = true;
        });


        if (!errorConnecting) {

            const client = await transactionPool.connect();

            try {

                await client.query('BEGIN');
                var transactionForPrefix = 'UPDATE servers SET prefix = $1 WHERE server_id = $2';
                const res = await client.query(transactionForPrefix, [new_prefix_value, guild_id]);
                await client.query('COMMIT');

                return true;

            } catch (e) {
                await client.query('ROLLBACK');
                return false;    // error state
            } finally {
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                client.release();
            }


        }


    },


    GetServerPrefix: async function GetServerPrefix(guild_id) {

        var guildPrefix = null;


        // error handling for the pool
        var errorConnecting = false;
        await transactionPool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            errorConnecting = true;
        });


        if (!errorConnecting) {


            const client = await transactionPool.connect();

            try {

                await client.query('BEGIN');
                var transactionForPrefix = 'SELECT prefix FROM servers WHERE server_id = $1';
                const res = await client.query(transactionForPrefix, [guild_id]);
                await client.query('COMMIT');

                guildPrefix = res.rows[0].prefix;



            } catch (e) {
                await client.query('ROLLBACK');
                return false;
            } finally {
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                client.release();
                return guildPrefix;
            }

        }




    }


    //GetServerPrefix: async function GetServerPrefix(guild_id) {

    //    var guildPrefix = null;
       

    //    // error handling for the pool
    //    var errorConnecting = false;
    //    await transactionPool.on('error', (err, client) => {
    //        console.error('Unexpected error on idle client', err)
    //        errorConnecting = true;
    //    });


    //    if (!errorConnecting) {
    //        (async () => {
    //            const client = await transactionPool.connect();

    //            try {

    //                await client.query('BEGIN');
    //                var transactionForPrefix = 'SELECT prefix FROM servers WHERE server_id = $1';
    //                const res = await client.query(transactionForPrefix, [guild_id]);
    //                await client.query('COMMIT');

    //                guildPrefix = res.rows[0].prefix;



    //            } catch (e) {
    //                await client.query('ROLLBACK');
    //                throw e;
    //            } finally {
    //                // Make sure to release the client before any error handling,
    //                // just in case the error handling itself throws an error.
    //                client.release();
    //                return guildPrefix;
    //            }

    //        })().catch(err => console.log(err.stack))
    //    }


        

    //}




};