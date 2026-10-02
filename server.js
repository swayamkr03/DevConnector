const express=require('express');
const path=require('path');
const connectDB=require('./config/db');

const app=express();
const PORT=process.env.PORT || 5000;

// Init Middleware
app.use(express.json({extended:false}));

if(process.env.NODE_ENV !== 'production'){
    app.get('/',(req,res)=>res.send('API Running'));
}

// Start accepting requests only after the database is ready.
const startServer=async()=>{
    await connectDB();
    app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
};

app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));

if(process.env.NODE_ENV === 'production'){
    // Keep unknown API requests separate from React's client-side routes.
    app.use('/api',(req,res)=>res.status(404).json({msg:'API route not found'}));
    app.use(express.static(path.join(__dirname,'client','build')));
    // Express 5 requires a named wildcard; braces also include the root URL.
    app.get('/{*splat}',(req,res)=>{
        if(path.extname(req.path)){
            return res.status(404).send('File not found');
        }
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}

if(require.main === module){
    startServer();
}

module.exports=app;
