const PostsModel = require("../models/postsModel");

class PostsController {
  async getPosts(req, res) {
    try {
      const { _page, _perPage, _sort, _order, _searchValue } = req.query;

      const page = parseInt(_page) || 1;
      const perPage = parseInt(_perPage) || 10;

      // когда я отправляю запрос на сервер fetchPosts без параметров searchValue, currentPage, sort, order,
      // то сюда они приходят именно как строка "undefined", а не как значение undefined,
      // поэтому у меня проверка на равенство строке "undefined"

      // console.log(_sort === 'undefined', typeof _sort, _sort)

      // ты мне показывала на примере fetchFreshPosts и убирала там вот эти параметры (_sort=id&_order=desc),
      // тогда непереданные параметры равны undefined. 
      // А что делать в случае с fetchPosts?

      const sort = _sort === "undefined" ? "id" : _sort;

      const order =
        (_order && _order.toUpperCase() === "DESC") || _order === "undefined"
          ? -1
          : 1;
      const searchValue = _searchValue === "undefined" ? "" : _searchValue;

      const search = searchValue ? { title: new RegExp(searchValue, "i") } : {};

      const totalCount = await PostsModel.countDocuments(search);
      const data = await PostsModel.find(search)
        .sort({ [sort]: order })
        .skip((page - 1) * perPage)
        .limit(perPage);

      return res.status(200).json({
        posts: {
          metadata: {
            totalCount,
          },
          data,
        },
      });
    } catch (error) {
      res.status(400).json({ message: "Произошла ошибка при получении" });
    }
  }

  async addPost(req, res) {
    try {
      const PostModel = new PostsModel({
        title: req.body.title,
        body: req.body.body,
        id: req.body.id,
      });

      await PostModel.save();
      res.status(200).json({ message: "Элемент успешно добавлен" });
    } catch (e) {
      res.status(400).json({ message: "Произошла ошибка при добавлении" });
    }
  }

  async deletePost(req, res) {
    try {
      const { deletedCount } = await PostsModel.deleteOne({
        id: req.body.id,
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
      const updatedPost = await PostsModel.findOneAndUpdate(
        { id: req.body.id },
        { title: req.body.title, body: req.body.body },
        { new: true }
      );

      if (!updatedPost) {
        return res
          .status(400)
          .json({ message: "Произошла ошибка при редактировании" });
      }

      res.status(200).json({ message: "Элемент успешно отредактирован" });
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
