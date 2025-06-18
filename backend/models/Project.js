import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  technologies: [String],
  languages: [String],
  image: String,
  link: String,
  link1:Sring,
  category: { type: String, default: 'project' },

  // 🆕 Optional projectType only if category === 'project'
  projectType: {
    type: String,
    validate: {
      validator: function (value) {
        // Only allow value if category is 'project'
        if (this.category === 'project') return true;
        return !value; // Must be undefined/empty if category is not 'project'
      },
      message: props => `projectType is only allowed when category is 'project'.`,
    },
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
