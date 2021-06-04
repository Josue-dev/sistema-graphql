const mongoose = require('mongoose');


const ProductosSchema = mongoose.Schema({

    nombre:{
        type:String,
        required:true,
        trim:true
    },
    existencia:{
        type:Number,
        require:true
    },
    precio:{
        type:Number,
        require:true,
        trim:true
    },
    creado:{
        type:Date,
        default:Date.now()
    }
});
/*creamos un indice para consultar si existe por nombre busqueda */
ProductosSchema.index({nombre:'text'});
module.exports = mongoose.model('Producto', ProductosSchema);