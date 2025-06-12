import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String }, 
  icon: { type: String },
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
