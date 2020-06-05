package co.fuziontek.service.dto;

import java.util.List;

public class WikiCustomDTO {

    private String id;
    private String parentRef;
    private String title;
    private String contentWiki;
    private List<WikiCustomDTO> ListWiki;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentRef() {
        return parentRef;
    }

    public void setParentRef(String parentRef) {
        this.parentRef = parentRef;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContentWiki() {
        return contentWiki;
    }

    public void setContentWiki(String contentWiki) {
        this.contentWiki = contentWiki;
    }

    public List<WikiCustomDTO> getListWiki() {
        return ListWiki;
    }

    public void setListWiki(List<WikiCustomDTO> listWiki) {
        ListWiki = listWiki;
    }


}
