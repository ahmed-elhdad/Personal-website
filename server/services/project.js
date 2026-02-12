import mongoose, { mongo } from "mongoose";
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
      const { title, description, end_at, order } = data.body,
        { id } = data.params;
      if (!id) {
        return res.status(404).json({ error: "ID required" });
      }
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(401).json({ error: "Valid Project ID" });
      }
      const project = Project.findOne({ _id: id });
      if (!project) {
        return res.status(404).json({ error: "project not found" });
      }
      // Update the project data(title, description, order, end_at)
      project.findOneAndUpdate(
        { _id: id },
        {
          title: title ? title : project.title,
          description: description ? description : project.description,
          end_at: end_at ? end_at : project.end_at,
          order: order ? order : project.order,
        },
      );
      await project.save();
      res.status(201).json({ message: "project updated successfully" });
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async get(data, res) {
    try {
      const { id } = data.params;
      if (!id) {
        return res.status(404).json({ error: "ID required" });
      }
      if (id == "all") {
        const projects = Project.find({});
        return res
          .status(201)
          .json({ message: "projects getted successfully", data: projects });
      }
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(401).json({ error: "valid project ID" });
      }
      const project = Project.findOne({ _id: id });
      if (!project) {
        return res.status(404).json({ error: "project not found" });
      }
      res
        .status(201)
        .json({ message: "project gets successfully", data: project });
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async remove(data, res) {
    try {
      const { id } = data.params;
      if (!id) {
        return res.status(404).json({ error: "id required" });
      }
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(401).json({ error: "valid id" });
      }
      await Project.findOneAndDelete({ _id: id });
      res.status(201).json({ message: "project successfully deleted" });
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async love(data, res) {
    try {
      const { id } = data.params;
      if (!id) {
        return res.status(404).json({ error: "ID required" });
      }
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(401).json({ error: "valid project id" });
      }
      const project = await Project.findOne({ _id: id });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      await Project.findOneAndUpdate({ _id: id }, { loves: project.loves + 1 });
      await project.save();
      res.status(201).json({ message: "loved" });
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
  async unLove(data, res) {
    try {
      const { id } = data.params;
      if (!id) {
        return res.status(404).json({ error: "ID required" });
      }
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(401).json({ error: "valid project id" });
      }
      const project = await Project.findOne({ _id: id });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      await Project.findOneAndUpdate({ _id: id }, { loves: project.loves - 1 });
      await project.save();
      res.status(201).json({ message: "unloved" });
    } catch (error) {
      res.status(501).json({ error: error });
    }
  }
}
