import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLeadDetails, addNewComment } from "../API/api.fetch";
import AddLeadForm from "./AddLeadForm";

const LeadDetails = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditLead, setIsEditLead] = useState(false);
  const [commentText, setCommentText] = useState("");

  const updateLeadState = (state) => {
    setIsEditLead(state);
  };

  const updateLeadDetails = (updateLead) => {
    setLead(updateLead);
  };

  const showFormatedDateAndTime = (createdAt) => {
    const timestamp = new Date(createdAt);

    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(timestamp);

    return `${formattedDate}`;
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const fetchComment = async () => {
      try {
        const updatedLead = await addNewComment({
          commentData: { author: lead.salesAgent._id, commentText },
          leadId: lead._id,
        });
        if (updatedLead) {
          setLead(updatedLead);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComment();
    setCommentText("");
  };

  useEffect(() => {
    const fetchLeadInfoAsync = async () => {
      try {
        setLoading(true);
        const leadInfo = await fetchLeadDetails(leadId);
        if (leadInfo) {
          setLead(leadInfo);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeadInfoAsync();
  }, [leadId]);
  return (
    <div>
      <h5>Lead Details:</h5>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {lead && (
        <div>
          {!isEditLead && (
            <div>
              <p>
                <strong>Lead Name: </strong> {lead.name}
              </p>
              <p>
                <strong>Sales Agent: </strong> {lead.salesAgent.name}
              </p>
              <p>
                <strong>Lead Source:</strong> {lead.source}
              </p>
              <p>
                <strong>Lead Status:</strong> {lead.status}
              </p>
              <p>
                <strong>Priority:</strong> {lead.priority}
              </p>
              <p>
                <strong>Time to Close:</strong> {lead.timeToClose} days
              </p>

              <div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => updateLeadState(true)}
                >
                  Edit Lead
                </button>
              </div>
            </div>
          )}
          {isEditLead && (
            <AddLeadForm
              leadData={{ lead, updateLeadState, updateLeadDetails }}
            />
          )}
          <hr />
          {!isEditLead && (
            <div className="mt-5 col-md-6">
              <h5>Comments:</h5>

              {lead?.comments && (
                <div>
                  {lead.comments.map((comment) => (
                    <div key={comment._id}>
                      <span>{comment.author.name} - </span>
                      <small className="ms-2">
                        {showFormatedDateAndTime(comment.createdAt)}
                      </small>
                      <p>Comment: {comment.commentText}</p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleCommentSubmit}>
                <div>
                  <label htmlFor="comment">Add a Comment:</label>
                  <br />
                  <textarea
                    id="comment"
                    className="form-control"
                    placeholder="Write your comment here..."
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                  ></textarea>
                </div>

                <div className="mt-3">
                  <button className="btn btn-sm btn-warning">Submit</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadDetails;
