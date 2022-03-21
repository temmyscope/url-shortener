import mongoose from '../configs/db.config';

interface UrlMap {
	rawUrl: string;
	shortUrl: string;
	createdAt?: string;
	updatedAt?: string;
}

const urlMapSchema = new mongoose.Schema({
 	rawUrl: {
 		type: String,
 		unique: true,
 		required: true
	},
 	shortUrl: {
 		type: String,
 		unique: true,
 		required: true
 	},
 	createdAt: {
 		type: Date,
 		default: Date.now
 	},
 	updatedAt: {
 		type: Date,
 		default: Date.now
 	}
}, {
	collection: 'UrlMap'
});

urlMapSchema.index({ rawUrl: 1 });
urlMapSchema.index({ shortUrl: 1 });

var UrlMapModel: any = mongoose.model('UrlMap', urlMapSchema);


export { UrlMapModel };