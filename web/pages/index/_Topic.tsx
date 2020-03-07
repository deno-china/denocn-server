import { faClock, faCommentDots, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopicModel } from "../../models/topic";
        <div>
          <span className="type">{props.topic.type}</span>
          <Link to={`/detail/${props.topic.id}`}>
            <h2>{props.topic.title}</h2>
          </Link>
        </div>
        <div className="info">
          {props.topic.is_top && (
            <i className="tag" style={{ backgroundColor: "#fbbd08" }}>
              置顶
            </i>
          )}
          {props.topic.is_good && <i className="tag">精华</i>}
          {props.topic.last_reply_id ? (
            <>
              <Link
                className="author"
                to={`/user/${props.topic.reply_user_id}`}
              >
                {props.topic.reply_user_name}
              </Link>
              <FontAwesomeIcon icon={faClock} color="#bbb" />
              <span className="time">
                回复于
                {props.topic.last_reply_time}
              </span>
            </>
          ) : (
            <>
              <Link className="author" to={`/user/${props.topic.author_id}`}>
                {props.topic.user_nick_name}
              </Link>
              <FontAwesomeIcon icon={faClock} color="#bbb" />
              <span className="time">
                发布于
                {props.topic.created_at}
              </span>
            </>
          )}
          <span className="icon">
            <FontAwesomeIcon icon={faCommentDots} />
            {props.topic.reply_count}
          </span>
          <span className="icon">
            <FontAwesomeIcon icon={faEye} />
            {props.topic.view_count}
          </span>
        </div>
      </div>
    </li>
  );
}
