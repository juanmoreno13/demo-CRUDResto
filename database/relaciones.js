const Food = require('./models/Food');
const User = require('./models/User');
const Order = require('./models/Order');


//un usuario puede realizar mas de un pedido

User.hasMany(Order); 
Order.belongsTo(User);

//un pedido puede ser realizado por un unico usuario
// un pedido puede contener varios productos 

Order.hasOne(User);
Order.belongsTo(User);
Order.hasMany(Food);

//un producto puede formar parte de varios pedidos
Food.belongsToMany(Order);

