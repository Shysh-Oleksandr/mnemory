import e, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Set from '../models/set';

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to register set...');

    let { name, author, description, createdDate, lastVisitedDate, isCategorySet, terms, setId } = req.body;

    console.log(name, author);

    const set = new Set({
        _id: new mongoose.Types.ObjectId(),
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
            logging.info(`New set created...`);
            return res.status(201).json({ set: newSet });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.setID;

    logging.info(`Incoming read for ${_id} ...`);

    return Set.findById(_id)
        .populate('author')
        .then((set) => {
            if (set) {
                return res.status(200).json({ set });
            } else {
                return res.status(404).json({ message: 'set not found' });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.params.authorID;

    logging.info(`Incoming read all...`);

    return Set.find({ author: author_id })
        .populate('author')
        .exec()
        .then((sets) => {
            return res.status(200).json({
                count: sets.length,
                sets
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
        });
};

const query = (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.query;
    const author_id = req.params.authorID;

    logging.info(`Incoming query...`);

    const titleRegex = title ? new RegExp(title.toString(), 'i') : new RegExp('');
    return Set.find({ title: { $regex: titleRegex }, author: author_id })
        .exec()
        .then((sets) => {
            return res.status(200).json({
                count: sets.length,
                sets
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.setID;

    logging.info(`Incoming update for ${_id} ...`);

    return Set.findById(_id)
        .exec()
        .then((set) => {
            if (set) {
                set.set(req.body);

                set.save()
                    .then((newSet) => {
                        logging.info(`Set updated...`);
                        return res.status(201).json({ set: newSet });
                    })
                    .catch((error) => {
                        logging.error(error);
                        return res.status(500).json({ error });
                    });
            } else {
                return res.status(404).json({ message: 'set not found' });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
        });
};

const deleteSet = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.setID;

    logging.info(`Incoming delete for ${_id} ...`);

    return Set.findByIdAndDelete(_id)
        .then((set) => {
            return res.status(200).json({ message: `Set ${_id} was deleted.` });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({ error });
        });
};

export default {
    create,
    read,
    readAll,
    query,
    update,
    deleteSet
};
