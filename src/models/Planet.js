import { Schema, model, Types } from "mongoose";

const planetSchema = new Schema({

    name: {
        type: String,
        required: true,
        minLength: [ 2, 'The name must be at least 2 characters']
    },
    age: {
        type: Number,
        required: true,
        min: [ 0, 'The age must be a positive number' ],
    },
    solarSystem: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Inner', 'Outer', 'Dwarf'],
    },
    moons: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    rings: {
        type: String,
        required: true,
        enum: ['Yes', 'No'],
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],    
    owner: {
        type: Types.ObjectId,
        ref: 'User',       
    },
});

const Planet = model('Planet', planetSchema);

export default Planet;