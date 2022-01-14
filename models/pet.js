"use strict";

const mongoose = require('mongoose'),
        Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
  limit: 3 // how many records on each page
};

const PetSchema = new Schema({
  name: { type: String, required: true }
  , species: { type: String, required: true }
  , picUrl: { type: String }
  , picUrlSq: { type: String }
  , avatarUrl: { type: String, required: true }
  , description: { type: String, minlength: 10, required: true }
}, {
  timestamps: true
});

PetSchema.index({ name: 'text', species: 'text', description: 'text' }, { name: 'My text index', weights: { name: 10, species: 4, description: 1 } });

PetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Pet', PetSchema);
