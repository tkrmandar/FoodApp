const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://user1:N32ZV0Ceki0E6V3L@mandar.vax261g.mongodb.net/MealMagic?retryWrites=true&w=majority";

const mongoDB = async () => {
    await mongoose.connect(MONGO_URL)
    .then(async (e,err)=>{
        if(err) console.log(err);
        else{
            try {
                console.log("DBconnected");
                const fetched_data = await mongoose.connection.db.collection("food_items");
                await fetched_data.find({}).toArray()
                .then(async (data,err)=> {
                    const foodCategory = await mongoose.connection.db.collection("food_category");
                    foodCategory.find({}).toArray()
                    .then(async (catData,error)=>{
                        if(error){
                            console.log(error);
                        }
                        else{
                            global.food_items = data;
                            global.foodCategory = catData;
                        }
                    })
                    // if (err) {console.log(err);}
                    // else {
                    //     global.food_items = data;
                    // }
                })
            } catch (err) { console.log(err); }
        }
    })

    
}



module.exports = mongoDB;