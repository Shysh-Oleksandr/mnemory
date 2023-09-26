"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const set_1 = __importDefault(require("../controllers/set"));
const router = express_1.default.Router();
router.get('/read/:setID', set_1.default.read);
router.get('/query/:authorID', set_1.default.query);
router.post('/create', set_1.default.create);
router.patch('/update/:setID', set_1.default.update);
router.delete('/:setID', set_1.default.deleteSet);
router.get('/:authorID', set_1.default.readAll);
module.exports = router;
