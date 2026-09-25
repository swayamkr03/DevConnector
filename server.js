const express=require('express');
const connectDB=require('./config/db');

const app=express();
const PORT=process.env.PORT || 5000;

// Init Middleware
app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.send('API Running'));

// Start accepting requests only after the database is ready.
const startServer=async()=>{
    await connectDB();
    app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
};

app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));

startServer();
