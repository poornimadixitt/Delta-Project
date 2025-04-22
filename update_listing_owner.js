// This is a simplified example and might need adjustments based on your user association logic
const mongoose = require("mongoose");
const Listing = require("./models/listing"); // Adjust path as needed
const User = require("./models/user");     // Adjust path as needed

async function updateListings() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"); // Replace with your database URI

        const listingsWithoutOwner = await Listing.find({ owner: { $exists: false } });

        for (const listing of listingsWithoutOwner) {
            // Assuming you can determine the owner based on some other listing data
            // For example, if you have a 'creatorEmail' field:
            const creator = await User.findOne({ email: listing.creatorEmail });

            if (creator) {
                listing.owner = creator._id;
                await listing.save();
                console.log(`Updated listing: ${listing.title} with owner: ${creator.username}`);
            } else {
                console.log(`Could not find owner for listing: ${listing.title}`);
            }
        }

        console.log('Finished updating listings.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating listings:', error);
    }
}

updateListings();