import { ProjectService } from "../services/project.js";

export const create = async (req, res) => {
  await ProjectService.create(req, res);
};
export const edit = async (req, res) => {
  await ProjectService.edit(req, res);
};
export const get = async (req, res) => {
  await ProjectService.get(req, res);
};
export const remove = async (req, res) => {
  await ProjectService.remove(req, res);
};
export const love = async (req, res) => {
  await ProjectService.love(req, res);
};
export const unLove = async (req, res) => {
  await ProjectService.unLove(req, res);
};
