import Planet from "../models/Planet.js";

const planetService = {
    create(planetData, userId) {
        // planet model
        return Planet.create({ ...planetData, owner: userId });
    },
    getAll(filter = {}) {
        const query = Planet.find().lean();
        if (filter.name) {
            query.find({ name: { $regex:filter.name, $options: 'i'}})
        }
        if (filter.solarSystem) {
            query.find({solarSystem: { $regex:filter.solarSystem, $options: 'i'}});  
        }
        return query;
    },
    getOne(planetId) {
        return Planet.findById(planetId);
    },
    vote(planetId, userId) {
        return Planet.findByIdAndUpdate(planetId, { $push: { likedList: userId } });
    },
    remove(planetId) {
        return Planet.findByIdAndDelete(planetId);
    },
    edit(planetId, planetData) {
        return Planet.findByIdAndUpdate(planetId, planetData, {runValidators: true});
    },
};

export default planetService;