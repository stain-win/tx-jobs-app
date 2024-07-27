import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
    let pipe: HighlightPipe;

    beforeEach(() => {
        pipe = new HighlightPipe();
    });

    it('should return highlight tag', () => {
        expect(pipe.transform('Developer Assessment Centre', 'Centre'))
            .toEqual('Developer Assessment <span class="font-highlight">Centre</span>');

        expect(pipe.transform('Population characteristics', 'ti'))
            .toEqual('Popula<span class="font-highlight">ti</span>on characteris<span class="font-highlight">ti</span>cs');
    });

    it('should return same as original', () => {
        expect(pipe.transform('Developer Assessment Centre', '')).toEqual('Developer Assessment Centre');
    });

    it('should highlight HTML tags', () => {
        expect(pipe.transform('<script>alert("biobank")</script>', '<script>alert("bio'))
            .toEqual('<span class="font-highlight"><script>alert("bio</span>bank")</script>');

        expect(pipe.transform('<script>alert("biobank")</script>', '<'))
            .toEqual('<span class="font-highlight"><</span>script>alert("biobank")<span class="font-highlight"><</span>/script>');
    });

});
