const PostsModel = require("../models/postsModel");

class PostsController {
  async getPosts(req, res) {
    try {
      const { _page, _perPage, _sort, _order, _searchValue } = req.query;
  
      const page = parseInt(_page) || 1;
      const perPage = parseInt(_perPage) || 10;
      const sort = _sort;
      const order = _order && _order.toUpperCase() === "DESC" ? -1 : 1;
      const searchValue = _searchValue || "";
  
      const filter = searchValue ? { title: new RegExp(searchValue, "i") } : {};
  
      const totalCount = await PostsModel.countDocuments(filter);
      const data = await PostsModel.find(filter)
        .sort({ [sort]: order })
        .skip((page - 1) * perPage)
        .limit(perPage);
  
      return res.status(200).json({
        posts: {
          metadata: {
            totalCount
          },
          data
        }
      });
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

      const PostModel = new PostsModel({ title: req.body.title, body: req.body.body, id: req.body.id });

      await PostModel.save();
      const data = await PostsModel.find()
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
        req.body.id,
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

  async getPostById(req, res) {
    try {
      const updatedPost = await PostsModel.findOne({ id: req.params.id });
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Пост не найден" });
      }
  
      res.status(200).json({ post: updatedPost });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Произошла ошибка при получении поста" });
    }
  }
}

module.exports = new PostsController();

// async getPosts(req, res) {
//   try {
//     const result = await PostsModel.find({});
//     res.status(200).json({ posts: result });
//   } catch (error) {
//     res.status(400).json({ message: "Произошла ошибка при получении" });
//   }
// }
