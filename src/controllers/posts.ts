import { Request, Response } from 'express';
const pool = require('./db'); 



interface Post {
  id: string;
  content: string;
}
const posts: Post[] = [];

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { id, content } = req.body;
    if (!id || !content) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    const query = 'INSERT INTO posts (id, content) VALUES (?, ?)';
    const values = [id, content];
  
    try {
      const result = await pool.query(query, values);
      
        res.status(201).json({ id, content });
      
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  export const getPost = async (req: Request, res: Response): Promise<void> => {
    const postId: string = req.params.id;
  
    try {
      const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
  
      res.json(rows[0]); // Assuming you want to return the first matching post
    } catch (error) {
      console.error('Error retrieving post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const analyzePost = async (req: Request, res: Response): Promise<void> => {
    const postId: string = req.params.id;
  
    try {
      const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
  
      const post = rows[0];
  
      const words: string[] = post.content.split(/\s+/); // Explicitly specify string array type
      const wordCount: number = words.length; // Explicitly specify number type
  
      console.log('Words:', words);
  
      const averageWordLength: number =
        wordCount > 0
          ? words.reduce((acc: number, word: string) => {
              // Ensure that the word is a non-empty string before adding its length
              if (typeof word === 'string' && word.length > 0) {
                return acc + word.length;
              } else {
                return acc;
              }
            }, 0) / wordCount
          : 0;
  
      res.json({
        wordCount,
        averageWordLength,
      });
    } catch (error) {
      console.error('Error analyzing post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };