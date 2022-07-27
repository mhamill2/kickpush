const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    body: {
      type: Object,
      text: {
        type: String,
        trim: true
      },
      attachments: [
        {
          type: Buffer
        }
      ],
      validate() {
        return this.text || (this.attachments && this.attachments.length > 0);
      }
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const Message = model('Message', messageSchema);
module.exports = Message;
