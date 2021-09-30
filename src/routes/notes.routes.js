const { Router } = require('express')
const router = Router()

const { isAuthenticated } = require('../helpers/auth');

const { renderNoteForm,
        createNewNote,
        renderNotes,
        renderEditForm,
        updateNote,
        deleteNote 
    } = require('../controllers/notes.controller')

// New Note
router.get('/notes/add', isAuthenticated, renderNoteForm)
router.post('/notes/new-note', isAuthenticated, createNewNote)

// Get all Notes
router.get('/notes', isAuthenticated, renderNotes)

// Edit Notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)
router.put('/notes/edit/:id', isAuthenticated, updateNote)

// Delete Note
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router
