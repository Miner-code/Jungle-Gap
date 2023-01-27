const Mongoose = require('mongoose');
const tacheSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
});
const Tache = Mongoose.model('Tache', tacheSchema);

exports.getTasks = async function(req, res) {
    try {
        const tasks = await Tache.find({});
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.createTask = async function(req, res, next) {
    const task = new Tache(req.body);
    try {
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.updateTask = async function(req, res, next) {
    try {
        const task = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.deleteTask = async function(req, res, next) {
    try {
        const task = await Tache.findByIdAndRemove(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.tacheGet = async function(req, res) {
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let dbo = client.db("taches");
        let data = await dbo.collection("taches").find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    } finally {
        client.close();
    }
};

exports.tachePost = async function(req, res) {
    let tache = req.body;
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let dbo = client.db("taches");
        await dbo.collection("taches").insertOne(tache);
        res.status(200).json(tache);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    } finally {
        client.close();
    }
};

exports.tacheDelete = async function(req, res) {
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let dbo = client.db("taches");
        await dbo.collection("taches").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    } finally {
        client.close();
    }
};

exports.tachePut = async function(req, res) {
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let dbo = client.db("taches");
        await dbo.collection("taches").updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: { titre: req.body.titre, termine: req.body.termine, statut: req.body.statut } });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    } finally {
        client.close();
    }
};