import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    isbn: {
        type: String,
        required: true, // Required because every book now has a unique ISBN in the CSV
        unique: true,
        sparse: true   // Allows multiple nulls if you ever make it optional
    },
}, {
    timestamps: true,
});

export const Book = mongoose.model("Book", bookSchema);