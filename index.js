const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const cron = require('cron');

app.use(cors());
app.use(express.json());


const updateBatchesJob = new cron.CronJob('0 0 * * *', updateExpiredBatches);
updateBatchesJob.start();




function updateExpiredBatches() {
    // Query the database for participants with expired batches
    pool.query('SELECT * FROM yoga WHERE date_of_expiry < CURRENT_DATE', (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        if (result.rows.length === 0) {
            // If no records were found, return without updating anything
            return;
        }

        // If records were found, update each participant's record with the new batch information
        result.rows.forEach((row) => {
            const email = row.email;
            const newBatch = row.batch; 

            pool.query('UPDATE yoga SET batch = $1, date_of_expiry = $2 WHERE email = $3', [newBatch, getNextExpirationDate(), email], (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
    });
}

function getNextExpirationDate() {
    // Calculate the next expiration date based on the current date and the length of the batch (30 days in this example)
    const now = new Date();
    const nextExpirationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
    return nextExpirationDate;
}




//post or registering a client
app.post("/register", async (req, res) => {
    try {
        const { batch, dob, email, gender, name, number, status } = req.body;
        // Check if the email or number already exists in the database
        const emailExists = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM yoga WHERE email = $1)",
            [email]
        );
        const numberExists = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM yoga WHERE number = $1)",
            [number]
        );
        // If the email or number already exists, send a response to the client with a status code of 400 (Bad Request) and a message
        if (emailExists.rows[0].exists || numberExists.rows[0].exists) {
            return res.status(400).json({ message: "Email or phone number already exists" });
        }
        const newClient = await pool.query("INSERT INTO yoga (batch, dob, email, gender, name, number, status) VALUES($1, $2, $3, $4, $5, $6, $7)",
            [batch, dob, email, gender, name, number, status]
        );
        switch (batch) {
            case 'Batch-1':
                const newBatch1 = await pool.query("INSERT INTO batch1 (batch, email, gender,name,number,status) VALUES($1, $2, $3, $4, $5, $6)",
                    [batch, email, gender, name, number, status])
                return res.send(newBatch1);
            case 'Batch-2':
                const newBatch2 = await pool.query("INSERT INTO batch2 (batch, email, gender,name,number,status) VALUES($1, $2, $3, $4, $5, $6)",
                    [batch, email, gender, name, number, status])
                return res.send(newBatch2);
            case 'Batch-3':
                const newBatch3 = await pool.query("INSERT INTO batch3 (batch, email, gender,name,number,status) VALUES($1, $2, $3, $4, $5, $6)",
                    [batch, email, gender, name, number, status])
                return res.send(newBatch3);
            case 'Batch-4':
                const newBatch4 = await pool.query("INSERT INTO batch4 (batch, email, gender,name,number,status)  VALUES($1, $2, $3, $4, $5, $6)",
                    [batch, email, gender, name, number, status])
                return res.send(newBatch4);
        }
        return res.json(newClient);
    } catch (err) {
        console.error(err.message);
    }
});





//update clients batch
app.put("/clients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { batch } = req.body;
        const updateBatch = await pool.query("UPDATE yoga SET batch = $1 WHERE yoga_id = $2", [batch, id]);

        res.json("Batch has been updated");
    } catch (err) {
        console.error(err.message);
    }
})


//update batch after expiry date which is 30days
app.post('/update-batch', async (req, res) => {
    const email = req.body.email;
    const newBatch = req.body.batch;

    // Look up the participant's record in the database, using the provided email address
    const findClient = pool.query('SELECT * FROM yoga WHERE email = $1', [email], async (err, result) => {
        if (err) {
            // If there was an error, return a response with an error message
            return res.status(500).send({ error: 'Error looking up participant' });
        }

        if (result.rows.length === 0) {
            // If no record was found, return a response indicating that the participant does not exist
            return res.status(404).send({ error: 'Participant not found' });
        }

        const client = result.rows[0];

        // Check if the current date is less than the expiration date
        const now = new Date();
        if (now < client.date_of_expiry) {
            // If the current date is less than the expiration date, return a response indicating that the participant should stay in their current batch
            return res.status(400).send({ error: 'Please stay in your current batch this month' });
        }

        updateExpiredBatch();
        // Return a success response to the client
        return res.send({ success: true });
    });
});



//all clients
app.get("/clients", async (req, res) => {
    try {
        const allClients = await pool.query("SELECT * FROM yoga");
        res.json(allClients.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//particulart client details
app.get("/clients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.query("SELECT * FROM yoga WHERE yoga_id = $1", [
            id
        ]);

        res.json(client.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//id delete

app.delete("/clients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM yoga WHERE yoga_id = $1", [
            id
        ]);
        res.json("Client has  been removed!");
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(5000, () => {
    console.log("Server has started on port 5000🚀");
})