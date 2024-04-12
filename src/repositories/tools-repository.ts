import { Prisma, Tag, Tool } from "@prisma/client";

export interface ICreateTool {
  title: string;
  link: string;
  description: string;
  tags: string[];
};

interface IReturnTool {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

interface IFindById {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface ToolsRepository {
  create(data: ICreateTool): Promise<ICreateTool | null>
  listAll(): Promise<IReturnTool[] | null>
  findByTags(tag: string): Promise<IReturnTool[] | null>
  findById(id: string): Promise<IFindById | null>
  findByTitle(title: string): Promise<IFindById | null>
  delete(id: string): {}
}