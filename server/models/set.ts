import mongoose, { Schema } from 'mongoose';
import { ISet } from '../interfaces/set';

const SetSchema: Schema = new Schema({
    name: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    createdDate: { type: Number },
    lastVisitedDate: { type: Number },
    isCategorySet: { type: Boolean },
    terms: { type: mongoose.Schema.Types.Mixed },
    setId: { type: Number, unique: true }
});

export default mongoose.model<ISet>('Set', SetSchema);
