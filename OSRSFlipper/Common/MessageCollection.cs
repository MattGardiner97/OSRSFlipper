using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace OSRSFlipper.Common
{
    public class MessageCollection : IEnumerable<Message>
    {
        private List<Message> messages = new List<Message>();

        public bool HasErrors { get; private set; } = false;

        public void AddMessage(Message Message)
        {
            this.messages.Add(Message);
            if (Message.MessageLevel == MessageLevel.Error)
                HasErrors = true;
        }

        public void AddMessages(IEnumerable<Message> Messages)
        {
            this.messages.AddRange(Messages);
            if (Messages.Any(msg => msg.MessageLevel == MessageLevel.Error))
                HasErrors = true;
        }

        public void AddMessage(string MessageText, MessageLevel Level = MessageLevel.Error)
        {
            AddMessage(new Message(MessageText, Level));
        }

        public IEnumerator<Message> GetEnumerator()
        {
            return messages.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return messages.GetEnumerator();
        }
    }
}
