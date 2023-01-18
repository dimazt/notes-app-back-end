
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
    constructor() {
        this._notes = [];
    }

    addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };
        // Menyimpan data array dari newNote ke this._notes
        this._notes.push(newNote);

        // Memeriksa apakah newNote berhasil masuk kedalam this._notes
        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return id;
    }

    getNotes() {
        return this._notes;
    }

    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];

        if (!note) {
            throw new NotFoundError('Catatan tidak ditemukan');
        } return note
    }

    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal memperbaharui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString;

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

    }

    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal menghapus catatan. Id tidak ditemukan');
        }

        return this._notes.splice(index, 1);
    }
}

// module.exports = NotesService;
module.exports = NotesService
