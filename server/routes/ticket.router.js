const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET ticket route
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM
    "Ticket";`;

    pool.query(query)
        .then(result => {
            console.log('GET IT!!', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all tickets', err);
            res.sendStatus(500)
        })
});

// GET a total count of upvotes column specific to user_id
router.get('/upvotes/:id', rejectUnauthenticated, (req, res) => {
    const query = `SELECT SUM ("upvotes")
    FROM "Ticket"
    WHERE "user_id" = $1;`;
    pool.query(query, [req.user.id])
        .then(result => {
            // console.log('MY SUUUUMM!!', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all upvotes by user_id', err);
            res.sendStatus(500)
        })
});

router.get('/ticketcount/:id', rejectUnauthenticated, (req, res) => {
    const query = `SELECT COUNT ("upvotes")
    FROM "Ticket"
    WHERE "user_id" = $1;`;
    pool.query(query, [req.user.id])
        .then(result => {
            // console.log('MY COUNTTTT!!', result.rows)
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all upvotes by user_id', err);
            res.sendStatus(500)
        })
});



/**
 * POST ticket route
 */
router.post('/', rejectUnauthenticated, (req, res) => {


});

/**
 * PUT ticket route 
 */
router.put('/', rejectUnauthenticated, (req, res) => {


});

/**
 * DELETE ticket route
 */
router.delete('/', rejectUnauthenticated, (req, res) => {


});

//Admin get all tickets route
router.get('/alltickets', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT "Ticket".*, "Subcategories"."name" AS "subcategory"
            FROM "Ticket"
            JOIN "Subcategories"
            ON "Subcategories"."id" = "Ticket"."subcategory_id"
            JOIN "User" 
            ON "User"."id" = "Ticket"."user_id";`; 

    pool.query(queryText)
        .then(result => {
            const tickets = result.rows
            const returnTickets = tickets.map(element => {
                console.log(element.category);
                switch (element.category) {
                    case '0':
                        return { ...element, categoryName: 'Accessibility' }
                    case '1':
                        return { ...element, categoryName: 'Animal Control' }
                    case '2':
                        return { ...element, categoryName: 'Biking' }
                    case '3':
                        return { ...element, categoryName: 'Garbage and Recycling' }
                    case '4':
                        return { ...element, categoryName: 'Graffiti' }
                    case '5':
                        return { ...element, categoryName: 'Health and Environmental' }
                    case '6':
                        return { ...element, categoryName: 'Parking' }
                    case '7':
                        return { ...element, categoryName: 'Property' }
                    case '8':
                        return { ...element, categoryName: 'Sidewalks and Streets' }
                    default:
                        return { ...element };
                }
                
            });
            console.log(returnTickets);
            res.send(returnTickets);
        }).catch((error) => {
            console.log('Error getting all tickets', error);
            res.sendStatus(500);
        });
});
module.exports = router;
