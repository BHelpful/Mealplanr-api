import { Schema, Document, model } from 'mongoose';
import { getDocumentRefs } from '../../utils/populate.utils';
const m2s = require('mongoose-to-swagger');

export interface StoreDocument extends Document {
	name: string;
}
export const StoreSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Store name',
	},
});

export const storeModelRefs = getDocumentRefs(StoreSchema);

const storeModel = model<StoreDocument>('stores', StoreSchema);

export const storeSM = m2s(storeModel);

export default storeModel;
