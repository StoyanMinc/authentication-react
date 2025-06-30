import { model, Schema, Types } from 'mongoose'

const taskSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Title is required!']
    },

    description: {
        type: String,
        default: 'No description'
    },

    dueDate: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },

    completed: {
        type: Boolean,
        default: false
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Task = model('Task', taskSchema);

export default Task;