//Import Router from express
const express = require("express");
const router = express.Router();
const axios = require("axios");
const twitter = require("../twitterRequest");

//Get tweets of given username for given optional count
router.get("/:username/:count?", async (req, res) => {
	const config = twitter.createRequest.timelineRequest(req.params.username, req.query.count);
	axios(config)
		.then(function (response) {
			res.json(response.data);
		})
		.catch(function (error) {
			if (!Object.is(error.response.status, 401))
				res.status(error.response.status).send(twitter.errorObject(error));
			res.status(500).send(twitter.errorObject(error));
			//Internal log
			console.error(error.response.status, error);
		});
});

//Export to be used as middleware
module.exports = router;