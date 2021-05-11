using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Common
{
    public class Message
    {
        public string MessageText { get; private set; }
        public MessageLevel MessageLevel { get; private set; }

        public Message(string MessageText, MessageLevel Level)
        {
            this.MessageText = MessageText;
            this.MessageLevel = Level;
        }
    }

    public enum MessageLevel
    {
        Information,
        Debug,
        Warning,
        Error
    }
}
