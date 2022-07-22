"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("../config/logging"));
const set_1 = __importDefault(require("../models/set"));
const create = (req, res, next) => {
    logging_1.default.info('Attempting to register set...');
    let { name, author, description, createdDate, lastVisitedDate, isCategorySet, terms, setId } = req.body;
    const set = new set_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        author,
        description,
        createdDate,
        lastVisitedDate,
        isCategorySet,
        terms,
        setId
    });
    return set
        .save()
        .then((newSet) => {
        logging_1.default.info(`New set created...`);
        return res.status(201).json({ set: newSet });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const read = (req, res, next) => {
    const _id = req.params.setID;
    logging_1.default.info(`Incoming read for ${_id} ...`);
    return set_1.default.findById(_id)
        .populate('author')
        .then((set) => {
        if (set) {
            return res.status(200).json({ set });
        }
        else {
            return res.status(404).json({ message: 'set not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    const author_id = req.params.authorID;
    logging_1.default.info(`Incoming read all...`);
    return set_1.default.find({ author: author_id })
        .populate('author')
        .exec()
        .then((sets) => {
        return res.status(200).json({
            count: sets.length,
            sets
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const query = (req, res, next) => {
    const { title } = req.query;
    const author_id = req.params.authorID;
    logging_1.default.info(`Incoming query...`);
    const titleRegex = title ? new RegExp(title.toString(), 'i') : new RegExp('');
    return set_1.default.find({ title: { $regex: titleRegex }, author: author_id })
        .exec()
        .then((sets) => {
        return res.status(200).json({
            count: sets.length,
            sets
        });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const update = (req, res, next) => {
    const _id = req.params.setID;
    logging_1.default.info(`Incoming update for ${_id} ...`);
    return set_1.default.findById(_id)
        .exec()
        .then((set) => {
        if (set) {
            set.set(req.body);
            set.save()
                .then((newSet) => {
                logging_1.default.info(`Set updated...`);
                return res.status(201).json({ set: newSet });
            })
                .catch((error) => {
                logging_1.default.error(error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res.status(404).json({ message: 'set not found' });
        }
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
const deleteSet = (req, res, next) => {
    const _id = req.params.setID;
    logging_1.default.info(`Incoming delete for ${_id} ...`);
    return set_1.default.findByIdAndDelete(_id)
        .then((set) => {
        return res.status(200).json({ message: `Set ${_id} was deleted.` });
    })
        .catch((error) => {
        logging_1.default.error(error);
        return res.status(500).json({ error });
    });
};
exports.default = {
    create,
    read,
    readAll,
    query,
    update,
    deleteSet
};
