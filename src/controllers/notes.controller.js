const notesCtrl = {};

const Note = require('../models/Notes');

notesCtrl.renderNoteForm = (req, res) => {
    //res.send('Notes Add');
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async(req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    //res.send('Salvo com sucesso');
    req.flash('success_msg', 'Note added Successfully');
    res.redirect('/notes');
    
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id});
    res.render('notes/all-notes', {notes, nameUser: req.user.name});
};

notesCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
};

notesCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
    //res.send('Delete note '+req.params.id);
};

module.exports = notesCtrl; 