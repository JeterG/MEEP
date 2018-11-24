import React from 'react';

const DocumentCard = (props) => {
  var { doc_id, doc_title, doc_owner } = props.doc;

  return (
    <div className="doc-card">
      <div className="doc-preview">
        {doc_id}
      </div>

      {doc_title} -- by {doc_owner}
    </div>
  )
}

export default DocumentCard;
