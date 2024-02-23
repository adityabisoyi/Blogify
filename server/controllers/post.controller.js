const Post = require('../models/post.model')
const User = require('../models/user.model')
const HttpError = require('../models/error.model')
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_KEY
    },
    region: process.env.BUCKET_REGION
})

const getAllPosts = async (req, res, next) => {
    try {
        const allPosts = await Post.find().sort({createdAt: -1});
        for(const post of allPosts) {
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: post.thumbnail
            }
            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
            post.thumbnail = url
        }
        return res.status(200).json({allPosts})
    } catch (error) {
        return next(new HttpError(error))
    }
}

const createPost = async (req, res, next) => {
    try {
        const {title, description, category} = req.body
        if(!title || !description || !category || !req.file) {
            return next(new HttpError("Please enter all the fields!", 400))
        }

        const imageName = Date.now() + req.user.id
        // console.log(imageName)
        const putObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }

        const command = new PutObjectCommand(putObjectParams)

        await s3.send(command)
        const newPost = await Post.create({
            title: title,
            description: description,
            category: category,
            author: req.user.id,
            thumbnail: imageName
        })

        return res.status(200).json({})
    } catch (error) {
        console.log(error)
        return next(new HttpError(error))
    }
}

const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const editPost = await Post.findById(postId)
        
        if(!editPost) {
            return next(new HttpError("Post unavailable", 404))
        }

        if(editPost.author == req.user.id) {
            const {title, category, description} = req.body
            // console.log(title, category, description)
            if(!title || !category || !description) {
                return next(new HttpError("Fill in all the fields", 400))
            }
            const editedPost = await Post.findByIdAndUpdate(postId, {
                title: title,
                category: category,
                description: description
            })

            return res.status(200).json({editedPost})
        } else {
            return next(new HttpError("Only author can edit the post"))
        }
        
    } catch (error) {
        return next(new HttpError(error))
    }
}

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const deletePost = await Post.findById(postId)
        // console.log(deletePost)
        if(!deletePost) {
            return next(new HttpError("Post unavailable", 404))
        }

        if(deletePost.author == req.user.id) {
            const deleteObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: deletePost.thumbnail
            }
            const command = new DeleteObjectCommand(deleteObjectParams)
            await s3.send(command)
            await Post.findByIdAndDelete(postId)
        } else {
            return next(new HttpError("Only author can delete the post"))
        }

        return res.status(200).json({messgae: "Post deleted"})
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const singlePost = await Post.findById(postId)
        if(!singlePost) {
            return next(new HttpError("No such post found", 404))
        }

        const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: singlePost.thumbnail
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        singlePost.thumbnail = url

        return res.status(200).json(singlePost) 
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getCategoryPosts = async (req, res, next) => {
    try {
        const {category} = req.params
        const categoryPosts = await Post.find({category: category}).sort({createdAt: -1})
        for(const post of categoryPosts) {
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: post.thumbnail
            }
            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
            post.thumbnail = url
        }
        return res.status(200).json({categoryPosts})
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const authorId = req.params.id
        const authorPosts = await Post.find({author: authorId}).sort({createdAt: -1})
        for(const post of authorPosts) {
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: post.thumbnail
            }
            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
            post.thumbnail = url
        }

        return res.status(200).json({authorPosts})
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = { createPost, getAllPosts, getCategoryPosts, getSinglePost, getUserPosts, editPost, deletePost }