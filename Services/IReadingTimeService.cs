namespace Umbraco17.Services
{
    public interface IReadingTimeService
    {

        int CalculateReadingTime(string? text, int wordsPerMinute = 200);

    }
}
