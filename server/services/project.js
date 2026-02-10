import Project from "../models/Project.js";

export class ProjectService {
  async create(data, res) {
    try {
      const { title, description, tages, order, start_data } = data.body;
      if (
        !title ||
        !description ||
        !tages ||
        tages.length <= 0 ||
        !start_data
      ) {
        return res.status(401).json({ error: "data required not found" });
      }

      // Handle uploaded files (Multer)
      if (!data.files) {
        return res.status(400).json({
          error: "At least one image must be uploaded",
          files: data.files,
        });
      }
      extitingProject = Project.findOne({ title: title });
      if (extitingProject) {
        return res.status(401).json({ message: "Project already exits" });
      }
      const imagePaths = data.files.map((file) => file.filename);
      const project = new Project({
        title,
        description,
        imagePaths,
        tages,
        order,
        start_data,
      });
      project.images = project.images.map((img) => getProductImageUrl(img));
      return res
        .status(201)
        .json({ message: "Project created successfully", data: project });
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async edit(data, res) {
    try {
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async get(data, res) {
    try {
      // If get the id will get a specific item if not reverce
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async remove(data, res) {
    try {
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async love(data, res) {
    try {
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async unLove(data, res) {
    try {
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
}
