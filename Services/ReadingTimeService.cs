using System.Text.RegularExpressions;

namespace Umbraco17.Services
{
    public class ReadingTimeService : IReadingTimeService
    {

        private static readonly Regex HtmlTagRegex = new("<.*?>", RegexOptions.Compiled);

        public int CalculateReadingTime(string? text, int wordsPerMinute = 200)
        {
            if (string.IsNullOrWhiteSpace(text))
                return 1;

            // Remove HTML so words are counted correctly
            var clean = HtmlTagRegex.Replace(text, " ");

            // Split on whitespace
            var words = clean.Split((char[])null!, StringSplitOptions.RemoveEmptyEntries);
            var count = words.Length;

            var wpm = wordsPerMinute <= 0 ? 200 : wordsPerMinute;
            var minutes = (int)Math.Ceiling(count / (double)wpm);

            return Math.Max(1, minutes);
        }

    }
}
