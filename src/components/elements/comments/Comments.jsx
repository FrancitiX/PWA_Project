import { useState } from "react";
import classNames from "classnames";
import styles from "./Comments.module.css";

export default function CommentsSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      id: Date.now(),
      text: newComment,
    };

    setComments([...comments, commentData]);
    setNewComment("");
  };

  return (
    <div className={classNames("container", styles.commentsSection)}>
      <div className={styles.commentsContainer}>
        <h2>Comentarios</h2>

        {comments.length === 0 ? (
          <p>No hay comentarios todavía. Sé el primero en comentar.</p>
        ) : (
          <ul className={styles.commentsList}>
            {comments.map((c) => (
              <li key={c.id} className={styles.commentItem}>
                {c.text}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <textarea
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.textarea}
          />

          <button type="submit" className={styles.submitBtn}>
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
}
