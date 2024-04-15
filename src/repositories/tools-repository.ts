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
  create(data: ICreateTool, user_id: string): Promise<ICreateTool | null>
  listAll(user_id: string): Promise<IReturnTool[] | null>
  findByTags(tag: string, user_id: string): Promise<IReturnTool[] | null>
  findById(id: string, user_id: string): Promise<IFindById | null>
  findByTitle(title: string, user_id: string): Promise<IFindById | null>
  delete(id: string, user_id: string): {}
}