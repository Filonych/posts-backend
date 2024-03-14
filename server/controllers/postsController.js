const PostsModel = require("../models/postsModel");

class PostsController {
  async getPosts(req, res) {
    try {
      const result = await PostsModel.find({});
      res.status(200).json({ posts: result });
    } catch (error) {
      res.status(400).json({ message: "Произошла ошибка при получении" });
    }
  }

  async addPost(req, res) {
    try {
      if (!req.body.title) {
        res.status(400).json({ message: "Пожалуйста, добавьте заголовок" });
        return;
      }

      const PostModel = new PostsModel({ title: req.body.title });

      await PostModel.save();
      res.status(200).json({ message: "Элемент успешно добавлен" });
    } catch (e) {
      res.status(400).json({ message: "Произошла ошибка при добавлении" });
    }
  }

  async deletePost(req, res) {
    try {
      if (!req.body.title) {
        res.status(400).json({ message: "Пожалуйста, укажите заголовок" });
        return;
      }

      const { deletedCount } = await PostsModel.deleteOne({
        title: req.body.title,
      });

      if (deletedCount === 0) {
        res.status(400).json({
          message: "Удаление не произошло, пожалуйста, проверьте заголовок",
        });
        return;
      }
      res.status(200).json({ message: "Элемент успешно удален" });
    } catch (e) {
      res.status(400).json({ message: "Произошла ошибка при удалении" });
    }
  }

  async editPost(req, res) {
    try {
      if (!req.body.title) {
        res.status(400).json({ message: "Пожалуйста, укажите заголовок" });
        return;
      }

      const updatedPost = await PostsModel.findByIdAndUpdate(
        req.body._id,
        { title: req.body.title },
        { new: true }
      );

      if (!updatedPost) {
        return res
          .status(400)
          .json({ message: "Произошла ошибка при редактировании" });
      }

      const allPosts = await PostsModel.find();

      res
        .status(200)
        .json({ posts: allPosts, message: "Элемент успешно отредактирован" });
    } catch (e) {
      res.status(400).json({ message: "Произошла ошибка при редактировании" });
    }
  }
}

module.exports = new PostsController();
